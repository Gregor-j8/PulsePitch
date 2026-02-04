import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface FieldProps {
  isMobile: boolean;
}

export const Field = ({ isMobile }: FieldProps) => {
  const pitchRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    // Draw custom pitch
    const pitchContainer = d3.select(pitchRef.current)
    pitchContainer.selectAll("*").remove()

    const svg = pitchContainer
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "-5 0 130 80")
      .attr("preserveAspectRatio", "xMidYMid meet")

    // Define patterns and gradients for realistic grass
    const defs = svg.append("defs")

    // Grass stripe pattern
    const stripePattern = defs.append("pattern")
      .attr("id", "grass-stripes")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 10)
      .attr("height", 80)

    // Alternating light and dark green stripes (mowed lawn effect)
    for (let i = 0; i < 13; i++) {
      stripePattern.append("rect")
        .attr("x", i * 10)
        .attr("y", 0)
        .attr("width", 5)
        .attr("height", 80)
        .attr("fill", i % 2 === 0 ? "#5fb830" : "#68c241")
    }

    // Vignette gradient for depth
    const vignetteGradient = defs.append("radialGradient")
      .attr("id", "vignette")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "60%")

    vignetteGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#000000")
      .attr("stop-opacity", "0")

    vignetteGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#000000")
      .attr("stop-opacity", "0.2")

    // Clip path for left penalty arc (only show part outside the box)
    defs.append("clipPath")
      .attr("id", "left-arc-clip")
      .append("rect")
      .attr("x", 18)
      .attr("y", 0)
      .attr("width", 120)
      .attr("height", 80)

    // Clip path for right penalty arc (only show part outside the box)
    defs.append("clipPath")
      .attr("id", "right-arc-clip")
      .append("rect")
      .attr("x", -10)
      .attr("y", 0)
      .attr("width", 112)
      .attr("height", 80)

    const g = svg.append("g")

    // Background with grass pattern
    g.append("rect")
      .attr("x", -5)
      .attr("y", 0)
      .attr("width", 130)
      .attr("height", 80)
      .attr("fill", "url(#grass-stripes)")

    // Vignette overlay for depth
    g.append("rect")
      .attr("x", -5)
      .attr("y", 0)
      .attr("width", 130)
      .attr("height", 80)
      .attr("fill", "url(#vignette)")

    // Pitch outline
    g.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 120)
      .attr("height", 80)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Halfway line
    g.append("line")
      .attr("x1", 60)
      .attr("y1", 0)
      .attr("x2", 60)
      .attr("y2", 80)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Center circle
    g.append("circle")
      .attr("cx", 60)
      .attr("cy", 40)
      .attr("r", 10)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Center spot
    g.append("circle")
      .attr("cx", 60)
      .attr("cy", 40)
      .attr("r", 0.5)
      .attr("fill", "#ffffff")

    // Left penalty area (18-yard box)
    g.append("rect")
      .attr("x", 0)
      .attr("y", 18)
      .attr("width", 18)
      .attr("height", 44)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Right penalty area (18-yard box)
    g.append("rect")
      .attr("x", 102)
      .attr("y", 18)
      .attr("width", 18)
      .attr("height", 44)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Left goal area (6-yard box)
    g.append("rect")
      .attr("x", 0)
      .attr("y", 30)
      .attr("width", 6)
      .attr("height", 20)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Right goal area (6-yard box)
    g.append("rect")
      .attr("x", 114)
      .attr("y", 30)
      .attr("width", 6)
      .attr("height", 20)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)

    // Left penalty spot
    g.append("circle")
      .attr("cx", 12)
      .attr("cy", 40)
      .attr("r", 0.5)
      .attr("fill", "#ffffff")

    // Right penalty spot
    g.append("circle")
      .attr("cx", 108)
      .attr("cy", 40)
      .attr("r", 0.5)
      .attr("fill", "#ffffff")

    // Left penalty arc (centered on penalty spot, clipped to show only outside box)
    g.append("circle")
      .attr("cx", 12)
      .attr("cy", 40)
      .attr("r", 10)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)
      .attr("clip-path", "url(#left-arc-clip)")

    // Right penalty arc (centered on penalty spot, clipped to show only outside box)
    g.append("circle")
      .attr("cx", 108)
      .attr("cy", 40)
      .attr("r", 10)
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.3)
      .attr("clip-path", "url(#right-arc-clip)")

    // Left goal with depth effect
    const leftGoal = g.append("g")

    // Goal shadow
    leftGoal.append("rect")
      .attr("x", -2.5)
      .attr("y", 33.5)
      .attr("width", 0.5)
      .attr("height", 13)
      .attr("fill", "#00000040")

    // Goal posts
    leftGoal.append("line")
      .attr("x1", 0)
      .attr("y1", 34)
      .attr("x2", -2)
      .attr("y2", 34)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)

    leftGoal.append("line")
      .attr("x1", -2)
      .attr("y1", 34)
      .attr("x2", -2)
      .attr("y2", 46)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)

    leftGoal.append("line")
      .attr("x1", -2)
      .attr("y1", 46)
      .attr("x2", 0)
      .attr("y2", 46)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)

    // Right goal with depth effect
    const rightGoal = g.append("g")

    // Goal shadow
    rightGoal.append("rect")
      .attr("x", 122)
      .attr("y", 33.5)
      .attr("width", 0.5)
      .attr("height", 13)
      .attr("fill", "#00000040")

    // Goal posts
    rightGoal.append("line")
      .attr("x1", 120)
      .attr("y1", 34)
      .attr("x2", 122)
      .attr("y2", 34)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)

    rightGoal.append("line")
      .attr("x1", 122)
      .attr("y1", 34)
      .attr("x2", 122)
      .attr("y2", 46)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)

    rightGoal.append("line")
      .attr("x1", 122)
      .attr("y1", 46)
      .attr("x2", 120)
      .attr("y2", 46)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.4)
  }, [isMobile])

  return <div ref={pitchRef} className="absolute inset-0 bg-[#5fb830]" />
}
