import Post from "../../components/post/post"
import Navbar from "../../components/navbar/navbar"
import { promises as fs } from 'fs';

async function loadConfig(){
  return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

export async function generateStaticParams(){
  const config = await fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
  const uri = config.apiServerURI + 'api/posts';
  const posts = await fetch(uri).then(res => res.json());

  return posts.map((post:any) => ({
    postId: String(post.postId),
  }))
}

export default async function PostPage({ params } : any) {
  let config = await loadConfig();
  return (
      <div className={"PostPage"}>
          <Navbar />
          <Post apiServerURI={config.apiServerURI} postId={params.postId} />
      </div>
  )
  }