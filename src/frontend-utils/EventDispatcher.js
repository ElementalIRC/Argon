class EventDispatcher {
    static events = {};

    static on(key, lambda) {
        EventDispatcher.events[key] = lambda;
    }

    static emit(key, data) {
        if (!(key in EventDispatcher.events)) {
            return false;
        }

        EventDispatcher.events[key](data);
        return true;
    }
}

export default EventDispatcher;
