class ChatMessages extends React.Component {
    render() {
        let classes = ["panel callout", "panel"];

        let pics = this.props.messages.map((message, i) => {
            return (
                <p className={classes[i % 2]}>
                    <strong>{message.author}</strong>: {message.text}
                </p>);
        });

        return <div>{pics}</div>;
    }
}

var cat = catsocket.init("catsocket-chat");
const ROOM = "chat";

class ChatForm extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        let node = React.findDOMNode(this.refs.message);
        let msg = node.value.trim();

        if (msg) {
            node.value = "";
            cat.broadcast(ROOM, JSON.stringify({
                text: msg,
                author: this.props.username
            }));
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="row collapse">
                    <div className="small-9 columns">
                        <input type="text" placeholder="Message ..." ref="message"/>
                    </div>
                    <div className="small-3 columns">
                        <button className="button postfix" type="submit">Send</button>
                    </div>
                </div>
            </form>
        );
    }
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: props.messages};
    }

    componentDidMount() {
        cat.join(ROOM, (message) => {
            let data = JSON.parse(message);

            this.setState(function (old) {
                let arr = old.messages;
                arr.push(data);
                return {messages: arr};
            });
        });
    }

    render() {
        return (
            <div>
                <p>Hello {this.props.username}</p>
                <ChatMessages messages={this.state.messages}/>
                <ChatForm username={this.props.username}/>
            </div>
        );
    }
}

class UsernameSelect extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        let name = React.findDOMNode(this.refs.username).value.trim();
        if (name) {
            this.props.nameSelected(name);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="row collapse">
                    <div className="small-9 columns">
                        <input autofocus type="text" ref="username" placeholder="Pick a username"/>
                    </div>
                    <div className="small-3 columns">
                        <button type="submit" className="button postfix">Submit</button>
                    </div>
                </div>

            </form>
        );
    }
}

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            messages: [
                {author: "john", text: "hello"},
                {author: "john", text: "world"}
            ]
        };
    }

    nameSelected(name) {
        this.setState({username: name});
    }

    render() {
        if (this.state.username) {
            return <ChatBox username={this.state.username} messages={this.state.messages} />;
        } else {
            return <UsernameSelect nameSelected={this.nameSelected.bind(this)} />;
        }
    }

}

React.render(<Chat nuf="puf"/>, document.getElementById("chat"));
