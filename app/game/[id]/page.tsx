
import Post from "../../components/post/post"
import Navbar from "../../components/navbar/navbar"
import { promises as fs } from 'fs';

async function loadConfig() {
  return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

export default async function GamePage({ params }: { params: { id: string } }) {
  let config = await loadConfig();
  return (
    <div className={"PostPage"}>
      <Navbar />
      <Post apiServerURI={config.apiServerURI} postId={params.id} />
    </div>
  )
}