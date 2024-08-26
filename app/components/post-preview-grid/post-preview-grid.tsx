const PostPreview = (props: any) => {
  const url = props.gameId ? "/game/" + props.id : "/post/" + props.id;
  return (
    <div
      key={props.id}
      className={'PostPreview'}>
      <a href={url}>
        <button className={'PostButton'}>
          <div className={'PostPreviewTitle'}>
            <h2>{props.title}</h2>
          </div>
          <div className={'PostPreviewSubtext'}>
            <p>{props.subtext}</p>
          </div>
          <div className={'PostPreviewAuthor'}>
            <p>{props.author}</p>
          </div>
          <div className={'PostPreviewDate'}>
            <p>{props.datetime}</p>
          </div>
        </button>
      </a>
    </div>
  )
}

const PostPreviewGridFromData = (postDataArray : any) => {
  let posts = postDataArray.map((postData: any) => {
    const { postId, postTitle, postSubtext, postAuthor, postDatetime, gameId } = postData;
    return (
      <PostPreview
        key={postId}
        id={postId}
        title={postTitle}
        subtext={postSubtext}
        author={postAuthor}
        datetime={postDatetime}
        gameId={gameId}
      />
    );
  });
  return posts;
}

export default async function PostPreviewGrid({ postDataArray }: any) {

  const posts = postDataArray != null ? PostPreviewGridFromData(postDataArray) : <></>;

  return (
    <div className={"PostContainer"}>
      <div className={"PostPreviewContainer"}>
        {posts}
      </div>
    </div>
  );
}