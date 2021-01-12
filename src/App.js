import React from "react";
import marked from 'marked';
import './App.css';

const markdownText = `# Hi, welcome to the React Markdown Previewer App

## You can write pretty much whatever you want in markdown and it will be translated to HTML!!

### Let's see some examples...

Here's a [link](https://github.com/Alfred021)

You can also display some html code \`<p></p>\`

There's some javascript code as well
\`\`\`
function checkMarkdown(markdown) {
    if (markdown){
  return 'Text written with markdown'
    }  else {
  return 'You should consider writing some text using markdown'
    }
}
\`\`\`

But there's more...

LISTS!!!

* Item 1
* Item 2 
* Texts can also be bolded **if you want**

Your favorite quotes!!!

> Heroes may not be braver than anyone else. They're just braver 5 minutes longer. - Ronald Reagan

We cannot finish this showcase without images.

![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png)
`;

marked.setOptions({
  breaks: true
});

const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

class Editor extends React.Component {
  
  render() {
    return(
      <div class="card text-dark bg-light mb-3" id="edit">
        <div class="card-header"><i class="fab fa-markdown"></i> <strong>Editor</strong></div>
  <div class="card-body">
    <div class="form-floating">
  <textarea id="editor" onChange={this.props.onChange} value={this.props.markdown} class="form-control"></textarea>
    </div>
  </div>
</div>
    )
  }
}

class Previewer extends React.Component {
  
  render() {
    return(
      <div class="card text-dark bg-light mb-3">
        <div class="card-header"><i class="fas fa-code"></i> <strong>Previewer</strong></div>
  <div class="card-body">
    <div id="preview" class="card-text" dangerouslySetInnerHTML={{
        __html: marked(this.props.markdown, { renderer: renderer })
      }}></div>
  </div>
</div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markdown: markdownText,
    }
  this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  
  render() {
    return(
      <div>
        <h1 class="text-center">Markdown Previewer</h1>
        <Editor onChange={this.handleChange} 
markdown={this.state.markdown}/>
        <Previewer markdown={this.state.markdown}/>
      </div>
    )
  }
}

export default App;
