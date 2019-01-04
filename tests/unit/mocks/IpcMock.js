class IpcMock {
    sentArguments = [];
    
    send() {
        this.sentArguments = arguments;
    }
}

export default IpcMock;
