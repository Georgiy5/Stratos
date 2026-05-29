import { useEffect, useRef, useState } from 'react'
import type {
    PointerEvent as ReactPointerEvent,
    ReactNode,
    TouchList as ReactTouchList,
    WheelEvent as ReactWheelEvent,
} from 'react'

type PanZoomProps = {
    width: number
    height: number
    children: ReactNode
    borderRadius?: number
    minScale?: number
    maxScale?: number
    background?: string
}

export default function PanZoom({
    width,
    height,
    children,
    borderRadius = 12,
    minScale = 0.4,
    maxScale = 4,
    background,
}: PanZoomProps) {
    const [isPanning, setIsPanning] = useState(false)
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
    const [isCoarsePointer, setIsCoarsePointer] = useState(false)
    const lastPointRef = useRef<{ x: number; y: number } | null>(null)
    const touchPanningRef = useRef(false)
    const lastTouchCenterRef = useRef<{ x: number; y: number } | null>(null)
    const lastTouchDistanceRef = useRef<number | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(hover: none) and (pointer: coarse)',
        )

        const updatePointerType = () => {
            setIsCoarsePointer(mediaQuery.matches)
        }

        updatePointerType()
        mediaQuery.addEventListener('change', updatePointerType)

        const isInsideContainer = (event: Event) => {
            const container = containerRef.current
            if (!container || !(event.target instanceof Node)) return false
            return container.contains(event.target)
        }

        const shouldBlock = (event: Event) => isInsideContainer(event)

        const handleNativeWheel = (event: WheelEvent) => {
            if (shouldBlock(event)) {
                event.preventDefault()
            }
        }

        const handleGesture = (event: Event) => {
            if (shouldBlock(event)) {
                event.preventDefault()
            }
        }

        const handleNativeTouchStart = (event: TouchEvent) => {
            if (!shouldBlock(event)) return
            event.preventDefault()

            if (event.touches.length === 1) {
                const touch = event.touches[0]
                setIsPanning(true)
                touchPanningRef.current = true
                lastPointRef.current = { x: touch.clientX, y: touch.clientY }
                resetTouchZoomState()
                return
            }

            if (event.touches.length >= 2) {
                setIsPanning(false)
                touchPanningRef.current = false
                lastPointRef.current = null
                lastTouchCenterRef.current = getTouchCenter(event.touches)
                lastTouchDistanceRef.current = getTouchDistance(event.touches)
            }
        }

        const handleNativeTouchMove = (event: TouchEvent) => {
            if (!shouldBlock(event)) return
            event.preventDefault()

            if (
                event.touches.length === 1 &&
                touchPanningRef.current &&
                lastPointRef.current
            ) {
                const touch = event.touches[0]
                const deltaX = touch.clientX - lastPointRef.current.x
                const deltaY = touch.clientY - lastPointRef.current.y
                lastPointRef.current = { x: touch.clientX, y: touch.clientY }
                setTransform((prev) =>
                    clampTransform({
                        ...prev,
                        x: prev.x + deltaX,
                        y: prev.y + deltaY,
                    }),
                )
                return
            }

            if (event.touches.length >= 2) {
                touchPanningRef.current = false
                const rect = containerRef.current?.getBoundingClientRect()
                if (!rect) return
                const center = getTouchCenter(event.touches)
                const distance = getTouchDistance(event.touches)

                if (
                    lastTouchCenterRef.current &&
                    lastTouchDistanceRef.current &&
                    distance > 0
                ) {
                    const zoomFactor = distance / lastTouchDistanceRef.current
                    const centerX = center.x - rect.left
                    const centerY = center.y - rect.top

                    setTransform((prev) => {
                        const nextScale = clamp(
                            prev.scale * zoomFactor,
                            minScale,
                            maxScale,
                        )
                        const ratio = nextScale / prev.scale
                        return clampTransform({
                            scale: nextScale,
                            x: centerX - (centerX - prev.x) * ratio,
                            y: centerY - (centerY - prev.y) * ratio,
                        })
                    })
                }

                lastTouchCenterRef.current = center
                lastTouchDistanceRef.current = distance
            }
        }

        const handleNativeTouchEnd = (event: TouchEvent) => {
            if (!shouldBlock(event)) return
            event.preventDefault()

            if (event.touches.length === 0) {
                stopPanning()
                resetTouchZoomState()
                return
            }

            if (event.touches.length === 1) {
                const touch = event.touches[0]
                setIsPanning(true)
                touchPanningRef.current = true
                lastPointRef.current = { x: touch.clientX, y: touch.clientY }
                resetTouchZoomState()
            }
        }

        const options = { passive: false, capture: true } as const

        document.addEventListener('wheel', handleNativeWheel, options)
        window.addEventListener('wheel', handleNativeWheel, options)
        document.addEventListener('gesturestart', handleGesture, options)
        document.addEventListener('gesturechange', handleGesture, options)
        document.addEventListener('gestureend', handleGesture, options)
        window.addEventListener('gesturestart', handleGesture, options)
        window.addEventListener('gesturechange', handleGesture, options)
        window.addEventListener('gestureend', handleGesture, options)
        document.addEventListener('touchstart', handleNativeTouchStart, options)
        document.addEventListener('touchmove', handleNativeTouchMove, options)
        document.addEventListener('touchend', handleNativeTouchEnd, options)
        document.addEventListener('touchcancel', handleNativeTouchEnd, options)

        return () => {
            mediaQuery.removeEventListener('change', updatePointerType)
            document.removeEventListener('wheel', handleNativeWheel, options)
            window.removeEventListener('wheel', handleNativeWheel, options)
            document.removeEventListener('gesturestart', handleGesture, options)
            document.removeEventListener(
                'gesturechange',
                handleGesture,
                options,
            )
            document.removeEventListener('gestureend', handleGesture, options)
            window.removeEventListener('gesturestart', handleGesture, options)
            window.removeEventListener('gesturechange', handleGesture, options)
            window.removeEventListener('gestureend', handleGesture, options)
            document.removeEventListener(
                'touchstart',
                handleNativeTouchStart,
                options,
            )
            document.removeEventListener(
                'touchmove',
                handleNativeTouchMove,
                options,
            )
            document.removeEventListener(
                'touchend',
                handleNativeTouchEnd,
                options,
            )
            document.removeEventListener(
                'touchcancel',
                handleNativeTouchEnd,
                options,
            )
        }
    }, [])

    const clamp = (value: number, min: number, max: number) =>
        Math.min(max, Math.max(min, value))

    const clampTransform = (next: { x: number; y: number; scale: number }) => {
        return next
    }

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        setIsPanning(true)
        lastPointRef.current = { x: event.clientX, y: event.clientY }
    }

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!isPanning || !lastPointRef.current) return
        const deltaX = event.clientX - lastPointRef.current.x
        const deltaY = event.clientY - lastPointRef.current.y
        lastPointRef.current = { x: event.clientX, y: event.clientY }
        setTransform((prev) =>
            clampTransform({
                ...prev,
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }),
        )
    }

    const stopPanning = () => {
        setIsPanning(false)
        touchPanningRef.current = false
        lastPointRef.current = null
    }

    const getTouchCenter = (touches: ReactTouchList | TouchList) => {
        const first = touches[0]
        const second = touches[1]
        return {
            x: (first.clientX + second.clientX) / 2,
            y: (first.clientY + second.clientY) / 2,
        }
    }

    const getTouchDistance = (touches: ReactTouchList | TouchList) => {
        const first = touches[0]
        const second = touches[1]
        const deltaX = second.clientX - first.clientX
        const deltaY = second.clientY - first.clientY
        return Math.hypot(deltaX, deltaY)
    }

    const resetTouchZoomState = () => {
        lastTouchCenterRef.current = null
        lastTouchDistanceRef.current = null
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0]
            setIsPanning(true)
            touchPanningRef.current = true
            lastPointRef.current = { x: touch.clientX, y: touch.clientY }
            resetTouchZoomState()
            return
        }

        if (event.touches.length >= 2) {
            setIsPanning(false)
            touchPanningRef.current = false
            lastPointRef.current = null
            lastTouchCenterRef.current = getTouchCenter(event.touches)
            lastTouchDistanceRef.current = getTouchDistance(event.touches)
        }
    }

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (
            event.touches.length === 1 &&
            touchPanningRef.current &&
            lastPointRef.current
        ) {
            const touch = event.touches[0]
            const deltaX = touch.clientX - lastPointRef.current.x
            const deltaY = touch.clientY - lastPointRef.current.y
            lastPointRef.current = { x: touch.clientX, y: touch.clientY }
            setTransform((prev) =>
                clampTransform({
                    ...prev,
                    x: prev.x + deltaX,
                    y: prev.y + deltaY,
                }),
            )
            return
        }

        if (event.touches.length >= 2) {
            touchPanningRef.current = false
            const rect = event.currentTarget.getBoundingClientRect()
            const center = getTouchCenter(event.touches)
            const distance = getTouchDistance(event.touches)

            if (
                lastTouchCenterRef.current &&
                lastTouchDistanceRef.current &&
                distance > 0
            ) {
                const zoomFactor = distance / lastTouchDistanceRef.current
                const centerX = center.x - rect.left
                const centerY = center.y - rect.top

                setTransform((prev) => {
                    const nextScale = clamp(
                        prev.scale * zoomFactor,
                        minScale,
                        maxScale,
                    )
                    const ratio = nextScale / prev.scale
                    return clampTransform({
                        scale: nextScale,
                        x: centerX - (centerX - prev.x) * ratio,
                        y: centerY - (centerY - prev.y) * ratio,
                    })
                })
            }

            lastTouchCenterRef.current = center
            lastTouchDistanceRef.current = distance
        }
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (event.touches.length === 0) {
            stopPanning()
            resetTouchZoomState()
            return
        }

        if (event.touches.length === 1) {
            const touch = event.touches[0]
            setIsPanning(true)
            touchPanningRef.current = true
            lastPointRef.current = { x: touch.clientX, y: touch.clientY }
            resetTouchZoomState()
        }
    }

    const handlePointerLeave = () => {
        stopPanning()
    }

    const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
        stopPanning()
    }

    const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
        stopPanning()
    }

    const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        const cursorX = event.clientX - rect.left
        const cursorY = event.clientY - rect.top
        const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9

        setTransform((prev) => {
            const nextScale = clamp(prev.scale * zoomFactor, minScale, maxScale)
            const ratio = nextScale / prev.scale
            return clampTransform({
                scale: nextScale,
                x: cursorX - (cursorX - prev.x) * ratio,
                y: cursorY - (cursorY - prev.y) * ratio,
            })
        })
    }

    const handleDoubleClick = () => {
        setTransform({ x: 0, y: 0, scale: 1 })
    }

    return (
        <div
            ref={containerRef}
            style={{
                width,
                height,
                overflow: 'hidden',
                borderRadius,
                cursor: isPanning ? 'grabbing' : 'grab',
                touchAction: 'none',
                userSelect: 'none',
                overscrollBehavior: 'contain',
                position: 'relative',
                background,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerLeave}
            onWheelCapture={handleWheel}
            onDoubleClick={handleDoubleClick}
            onTouchStartCapture={(event) => {
                event.preventDefault()
                handleTouchStart(event)
            }}
            onTouchMoveCapture={(event) => {
                event.preventDefault()
                handleTouchMove(event)
            }}
            onTouchEndCapture={(event) => {
                event.preventDefault()
                handleTouchEnd(event)
            }}
            onTouchCancelCapture={(event) => {
                event.preventDefault()
                handleTouchEnd(event)
            }}
        >
            <div
                style={{
                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                    transformOrigin: '0 0',
                    display: 'inline-block',
                    pointerEvents: isCoarsePointer ? 'none' : 'auto',
                }}
            >
                {children}
            </div>
        </div>
    )
}
