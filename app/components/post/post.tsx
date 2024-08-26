import PostTitle from "./post-title";
import Game from "../game/game"
import PostText from "./post-text";

async function fetchPost(uri:string) {
  return fetch(uri, { next: { revalidate: 60 } })
    .then(res => res.json());
}


export async function PostFromData(uri : string, postData: any) {
  return (
    <div className="PostContainer">
      <PostTitle title={postData.postTitle} />
      <div className={"Post"}>
        <div className={"PostContent"}>
          <PostText markdownContent={postData.postMarkdownContent}/>
          {postData.gameId ? <Game gamePath={postData.gamePath} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default async function Post(props: any) {

  const { apiServerURI, postId } = props;
  const uri = `${apiServerURI}api/posts/${postId}`;

  const postData = await fetchPost(uri);

  return PostFromData(uri, postData);
}
