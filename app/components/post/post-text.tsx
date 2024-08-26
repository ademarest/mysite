import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import { slug } from 'github-slugger';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as theme }
  from "react-syntax-highlighter/dist/esm/styles/prism";

const getAllText = (nodeChildren: any, txt = "") => {
  //Call recursily until only text is returned.
  for (var child of nodeChildren) {
    txt = child.type === "text" ? txt + child.value : getAllText(child.children, txt);
  }
  return txt;
}

const rmdHeaderComponent = (headerprops: any) => {
  const { node, children, ...props } = headerprops;
  const { tagName } = node;
  const nodeChildren = node.children;
  let slugo;
  let rtn;

  if (nodeChildren.length > 1) {
    //This is necessary to recursivly extract all text from a header element's
    //node.children[].
    //E.g. if <code> is part of the header's node then this is needed to
    //generate a proper slug id.
    slugo = slug(getAllText(nodeChildren));
  } else {
    slugo = slug(children);
  }

  if (tagName === 'h2') {
    rtn = <h2 id={slugo}><a href={`#${slugo}`} {...props}> </a> {children} </h2>;
  } else if (tagName === 'h3') {
    rtn = <h3 id={slugo}><a href={`#${slugo}`} {...props}> </a> {children} </h3>
  } else if (tagName === 'h4') {
    rtn = <h4 id={slugo}><a href={`#${slugo}`} {...props}> </a> {children} </h4>
  } else if (tagName === 'h5') {
    rtn = <h5 id={slugo}><a href={`#${slugo}`} {...props}> </a> {children} </h5>
  }
  return (rtn)
}

const rmdCodeComponent = (codeprops: any) => {
  const { node, className, children, ...props } = codeprops;
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    <SyntaxHighlighter
      style={theme}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

const rmdTableComponent = (tableprops: any) => {
  return (
    <div className="PostTableContainer">
      <table {...tableprops}></table>
    </div>
  );
}

const rmdUnorderListComponent = (ulprops: any) => {
  return (
    <div className="PostUnorderedListContainer">
      <ul {...ulprops}></ul>
    </div>
  )
}

export default function PostText({ markdownContent }: any) {
  return (
    <ReactMarkdown
      className={"PostText"}
      remarkPlugins={[remarkGfm, remarkEmoji]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: rmdCodeComponent,
        table: rmdTableComponent,
        ul: rmdUnorderListComponent,
        h5: rmdHeaderComponent,
        h4: rmdHeaderComponent,
        h3: rmdHeaderComponent,
        h2: rmdHeaderComponent
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
}