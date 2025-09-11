import BlogsSection from "@/components/blogs/blogs-section";
import CtaImageSlider from "@/components/common/cta-image-slider";
import CTA from "@/components/common/cta-section";
import PageHero from "@/components/common/page-hero-section";
import LayoutTwo from "@/components/shared/LayoutTwo";
import getMarkDownData from "@/utils/GetMarkDownData";
import React from "react";

export const metadata = {
  title: "Mystic Minds Insights",
  description:
    "Discover expert blogs from Mystic Minds on AI, data solutions, and digital transformation strategies.",
};

export interface BlogType {
  slug: string;
  content: string;
  [key: string]: any;
}

const loadedBlogs: BlogType[] = getMarkDownData("data/blogs-data");

const BlogsPage = () => {
  return (
    <LayoutTwo>
      <PageHero
        badgeTitle="Blog"
        title="What we got to say"
        italicTitle=""
        description="These alternatives can add a different tone or emphasis depending on how you want  to introduce your creative team. Let me know if you'd like any specific adjustments!"
      />
      <BlogsSection Blogs={loadedBlogs} />

      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/08.png" },
            { id: "2", img: "/images/agent/09.png" },
            { id: "3", img: "/images/agent/10.png" },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutTwo>
  );
};

export default BlogsPage;
