import Post from "../components/post/post"
import Navbar from "../components/navbar/navbar"
import { promises as fs } from 'fs';
import PostPreviewGrid from "../components/post-preview-grid/post-preview-grid"

async function loadConfig() {
    return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

async function loadPostPreviewGridData(config: any) {
    let { apiServerURI } = config;
    return await fetch(`${apiServerURI}api/projects`, { next: { revalidate: 60 } }).then(res => res.json());
}

export default async function ProjectsPage() {
    let config = await loadConfig();
    let postPreviewGridData = await loadPostPreviewGridData(config);
    return (
        <div className={"PostPage"}>
            <Navbar />
            <Post apiServerURI={config.apiServerURI} postId={config.projectsPostId} />
            <PostPreviewGrid postDataArray={postPreviewGridData} />
        </div>
    )
}