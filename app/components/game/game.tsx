export default function Game (props:any) {
    const {gamePath} = props;
    return (
      <div className={"Game"}>
        <iframe src={gamePath}></iframe>
      </div>
    )
  }