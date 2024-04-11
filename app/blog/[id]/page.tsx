import client from "@/common/graphql/client"
import { LIST_BLOG, SINGLE_BLOG } from "@/common/graphql/queries"
import Link from "next/link"

export interface IBlogIdentification {
  id: string
}
export interface IBlogFields {
  Title: string,
  Description: string,
  Body: { type: string, children: any[]}
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
async function getStaticPropsForBlogPage(blogId: string) {
  const { data } = await client.query({ query: SINGLE_BLOG, variables: {
    blogId: blogId
  } })
  console.log(data, 'data')
  const blog: IBlog = data.blogPosts.data[0];

  return {
    blog
  }
}
const BlogPage = async ({ params }: { params: { id: string } }) => {
  const { blog } = await getStaticPropsForBlogPage(params.id)
  return (
    <div>
      {[blog].map((blog) => {
        return (
          <div key={blog.id}>
            <BlogTitle
              Title={blog.attributes.Title}
              isClickable={true}
              blogId={blog.id}
            />
            <div>
              <p>{blog.attributes.Description}</p>
              {blog.attributes.Body?.children?.map((child: any) => {
                return <p><pre>{JSON.stringify(child, null, 2)}</pre></p>
              })}
          </div>
          </div>
        );
      })}
    </div>
  )
}

export default BlogPage
