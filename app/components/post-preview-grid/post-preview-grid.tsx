import React from 'react';

const PostPreview = (props: any) => {
  const url = props.gameId ? '/game/' + props.id : '/post/' + props.id;
  const date_str = new Date(props.datetime).toLocaleDateString('en-CA');
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
            <p>{date_str}</p>
          </div>
        </button>
      </a>
    </div>
  )
}

const PostPreviewGridFromData = (postDataArray : any) => {
  postDataArray.sort((a:any, b:any) => new Date(b.postDatetime).valueOf() - new Date(a.postDatetime).valueOf());
  return postDataArray.map((postData: any) => {
    const {postId, postTitle, postSubtext, postAuthor, postDatetime, gameId} = postData;
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
}

export default async function PostPreviewGrid({ postDataArray }: any) {

  const posts = postDataArray != null ? PostPreviewGridFromData(postDataArray) : <></>;

  return (
    <div className={'PostContainer'}>
      <div className={'PostPreviewContainer'}>
        {posts}
      </div>
    </div>
  );
}
