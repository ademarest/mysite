
import Post from "../../components/post/post"
import Navbar from "../../components/navbar/navbar"
import { promises as fs } from 'fs';

async function loadConfig() {
  return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

export default async function GamePage({ params }:{ params: Promise<{ id: string }> }) {
  let {apiServerURI} = await loadConfig();
  let {id} = await params;
  return (
    <div className={"PostPage"}>
      <Navbar />
      <Post apiServerURI={apiServerURI} postId={id} />
    </div>
  )
}
