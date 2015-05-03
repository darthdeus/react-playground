class ChatMessages extends React.Component {
    render() {
        var messages = [
            {author: "john", text: "hello"},
            {author: "john", text: "world"}
        ];

        return (
            <ul>
                {messages.map(function (message) {
                    return <li>{message.author}: {message.text}</li>;
                })}
            </ul>
        );
    }
}

class ChatBox extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Message ..."/>
                <button type="submit">Send</button>
            </form>
        );
    }
}

class Chat extends React.Component {
    render() {
        return (
            <div>
                <ChatMessages />
                <ChatBox />
            </div>
        );
    }
}

React.render(<Chat/>, document.getElementById("chat"));
