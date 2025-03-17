import Post from "../components/post/post"
import Navbar from "../components/navbar/navbar";
import { promises as fs } from 'fs';

async function loadConfig() {
  return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

export default async function ContactPage(){
    let config = await loadConfig();
    console.log(config);
    console.log(config.apiServerURI);
    return (
        <div className="ContactPage">
            <Navbar/>
            <Post apiServerURI={config.apiServerURI} postId={config.contactPostId}/>
        </div>
    )
}
