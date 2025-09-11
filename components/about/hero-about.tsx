'use client'
import useReveal from '@/hooks/useReveal'
import RevealWrapper from '../animation/RevealWrapper'

interface PropsTypes {
  spacingTop?: string
}

const HeroAbout = ({ spacingTop }: PropsTypes) => {
  const { revealRef } = useReveal()

  return spacingTop ? (
    <RevealWrapper className={`${spacingTop} container`}>
      <h3
        ref={revealRef}
        className="reveal-text-2 text-secondary dark:text-backgroundBody"
      >
        MysticMind Data Solutions: Empowering businesses with AI and data-driven
        strategies. We deliver tailored, secure, and scalable innovations for a
        smarter digital future.
      </h3>
    </RevealWrapper>
  ) : (
    <RevealWrapper as="section" className="container">
      <h3 ref={revealRef}>
        We help organizations harness the power of data and AI to unlock insights,
        optimize operations, and accelerate growth with trusted expertise.
      </h3>
    </RevealWrapper>
  )
}

export default HeroAbout
