import CtaImageSlider from '@/components/common/cta-image-slider'
import CTA from '@/components/common/cta-section'
import ProjectDetailsSection from '@/components/projects/project-details'
import LayoutTwo from '@/components/shared/LayoutTwo'

import getMarkDownContent from '@/utils/GetMarkDownContent'
import getMarkDownData from '@/utils/GetMarkDownData'

export async function generateStaticParams() {
  const projects: any[] = getMarkDownData('data/project-data')
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export const metadata = {
  title: "Projects - Mystic Minds Solutions",
};


const ProjectsDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug
  const project02 = getMarkDownContent('data/project-data', slug)

  return (
    <LayoutTwo>
      <ProjectDetailsSection project={project02} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/01.jpg' },
            { id: '2', img: '/images/agent/02.jpg' },
            { id: '3', img: '/images/agent/03.jpg' },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">A virtual coffee?</i>
      </CTA>
    </LayoutTwo>
  )
}

export default ProjectsDetails
