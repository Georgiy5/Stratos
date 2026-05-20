import { useEffect, useRef, useState } from 'react'
import type {
    PointerEvent as ReactPointerEvent,
    ReactNode,
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
    const lastPointRef = useRef<{ x: number; y: number } | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isPointerInsideRef = useRef(false)

    useEffect(() => {
        const isInsideContainer = (event: Event) => {
            const container = containerRef.current
            if (!container || !(event.target instanceof Node)) return false
            return container.contains(event.target)
        }

        const shouldBlock = (event: Event) =>
            isPointerInsideRef.current || isInsideContainer(event)

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

        const options = { passive: false, capture: true } as const

        document.addEventListener('wheel', handleNativeWheel, options)
        window.addEventListener('wheel', handleNativeWheel, options)
        document.addEventListener('gesturestart', handleGesture, options)
        document.addEventListener('gesturechange', handleGesture, options)
        document.addEventListener('gestureend', handleGesture, options)
        window.addEventListener('gesturestart', handleGesture, options)
        window.addEventListener('gesturechange', handleGesture, options)
        window.addEventListener('gestureend', handleGesture, options)

        return () => {
            document.removeEventListener('wheel', handleNativeWheel, options)
            window.removeEventListener('wheel', handleNativeWheel, options)
            document.removeEventListener('gesturestart', handleGesture, options)
            document.removeEventListener('gesturechange', handleGesture, options)
            document.removeEventListener('gestureend', handleGesture, options)
            window.removeEventListener('gesturestart', handleGesture, options)
            window.removeEventListener('gesturechange', handleGesture, options)
            window.removeEventListener('gestureend', handleGesture, options)
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
        lastPointRef.current = null
    }

    const handlePointerLeave = () => {
        isPointerInsideRef.current = false
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

    const applyZoom = (
        zoomFactor: number,
        centerX: number,
        centerY: number,
    ) => {
        setTransform((prev) => {
            const nextScale = clamp(prev.scale * zoomFactor, minScale, maxScale)
            const ratio = nextScale / prev.scale

            return clampTransform({
                scale: nextScale,
                x: centerX - (centerX - prev.x) * ratio,
                y: centerY - (centerY - prev.y) * ratio,
            })
        })
    }

    const zoomIn = () => {
        applyZoom(1.1, width / 2, height / 2)
    }

    const zoomOut = () => {
        applyZoom(0.9, width / 2, height / 2)
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
            onPointerUp={stopPanning}
            onPointerLeave={handlePointerLeave}
            onPointerEnter={() => {
                isPointerInsideRef.current = true
            }}
            onWheelCapture={handleWheel}
            onDoubleClick={handleDoubleClick}
            onTouchMove={(event) => event.preventDefault()}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    zIndex: 2,
                }}
            >
                <button
                    type="button"
                    onClick={zoomIn}
                    onPointerDown={(event) => event.stopPropagation()}
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        background: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Увеличить"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={zoomOut}
                    onPointerDown={(event) => event.stopPropagation()}
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        background: 'rgba(255, 255, 255, 0.5)',
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: '32px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    aria-label="Уменьшить"
                >
                    -
                </button>
            </div>
            <div
                style={{
                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                    transformOrigin: '0 0',
                    display: 'inline-block',
                }}
            >
                {children}
            </div>
        </div>
    )
}
