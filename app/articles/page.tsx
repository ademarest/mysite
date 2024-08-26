import Post from "../components/post/post"
import Navbar from "../components/navbar/navbar"
import { promises as fs } from 'fs';
import PostPreviewGrid from "../components/post-preview-grid/post-preview-grid"

async function loadConfig() {
    return fs.readFile(process.cwd() + '/config.json', 'utf-8').then(content => JSON.parse(content));
}

async function loadPostPreviewGridData(config: any) {
    let { apiServerURI } = config;
    return await fetch(`${apiServerURI}api/articles`, { next: { revalidate: 60 } }).then(res => res.json());
}

export default async function ArticlesPage() {
    let config = await loadConfig();
    let postPreviewGridData = await loadPostPreviewGridData(config);
    return (
        <div className={"PostPage"}>
            <Navbar />
            <Post apiServerURI={config.apiServerURI} postId={config.articlesPostId} />
            <PostPreviewGrid postDataArray={postPreviewGridData} />
        </div>
    )
}