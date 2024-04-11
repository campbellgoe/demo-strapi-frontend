import client from "@/common/graphql/client"
import { LIST_BLOG } from "@/common/graphql/queries"
import Link from "next/link"

export interface IBlogIdentification {
  id: string
}
export interface IBlogFields {
  Title: string,
  Description: string,
  Body: string
}
export interface IBlogAttributes {
  attributes: Partial<IBlogFields> & Pick<IBlogFields, 'Title'>
}
export interface IBlog extends IBlogIdentification, IBlogAttributes { }
interface Props {
  blogs: IBlog[]
}
interface BlogTitleProps {
  Title: string
  isClickable: boolean
  blogId?: string
}

const BlogTitle = ({ Title, isClickable, blogId }: BlogTitleProps) => {
  if (isClickable && blogId) {
    return (
      <Link href={`/blog/${blogId}`}>{Title}</Link>
    )
  } else {
    return (
      <p>{Title}</p>
    )
  }
}
async function getStaticPropsForBlogPage() {
  const { data } = await client.query({ query: LIST_BLOG })
 
  const blogs: IBlog[] = data.blogPosts.data;

  return {
    blogs
  }
}
const BlogPage = async () => {
  const { blogs } = await getStaticPropsForBlogPage()
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <BlogTitle
              Title={blog.attributes.Title}
              isClickable={true}
              blogId={blog.id}
            />
            <div>
              <p>{blog.attributes.Description}</p>
              <p>{blog.attributes.Body}</p>
          </div>
          </div>
        );
      })}
    </div>
  )
}

export default BlogPage;