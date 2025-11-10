import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const getMarkDownData = (folder: string) => {
  const files = fs.readdirSync(folder)
  const markdownPosts = files.filter((file) => file.endsWith('.md'))

  const postsData = markdownPosts.map((file) => {
    const filePath = path.join(folder, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const data = matter(content)
    return {
      ...data.data,
      slug: file.replace('.md', ''),
      content: data.content,
    }
  })

  // Custom order: azure -> gcp -> aws
  const customOrder = ['azure', 'gcp', 'aws']
  const sortedPosts = customOrder
    .map((slug) => postsData.find((post) => post.slug === slug))
    .filter(Boolean) // remove undefined if a file is missing

  return sortedPosts
}

export default getMarkDownData
