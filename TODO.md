# TODO: Fix GSAP Visibility Issues on Landing Page

## Current Status
- GSAP dependencies installed successfully
- Dev server running
- User reports sections like "Career Acceleration" and "blue patti section" not visible
- GSAP animations not triggering properly on scroll

## Tasks
- [x] Identify problematic sections (ThinkSkoolAdvantage.vue for Career Acceleration, Testimonials.vue for blue stats section)
- [x] Update GSAP animations from gsap.from() to gsap.to() for better fallback visibility
- [x] Add ScrollTrigger markers for debugging
- [x] Ensure ScrollTrigger is properly registered in all components
- [x] Add default visible CSS states as fallback
- [ ] Test animations on scroll
- [ ] Verify responsive layout remains intact

## Files to Edit
- [x] src/components/ThinkSkoolAdvantage.vue
- [x] src/components/Testimonials.vue
- [x] src/components/Hero.vue
- [ ] src/components/EducationalValue.vue
- [x] src/components/CoursePortfolio.vue (Comprehensive Course Portfolio)
- [x] src/components/PortalFeatures.vue (Learning Portal Features)
- [x] src/components/RealWorldExposure.vue (Real-World Exposure)
- [x] src/components/VisionMission.vue (Our Core Values)
- [x] src/components/Credibility.vue (Credibility & Administration)
- [ ] src/components/Contact.vue
- [x] src/style.css (for fallback styles)

## Next Steps
- Update GSAP code in components
- Add debugging markers
- Test visibility and animations
