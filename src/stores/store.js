import { reactive } from "vue";
import data from "../data.json";

const state = reactive({
    books: [...data.books],
    authors: [...data.authors],
    publishers: [...data.publishers]
});

const getters = {
    getAuthorById: (id) => state.authors.find(a => a.id === id),
    getPublisherById: (id) => state.publishers.find(p => p.id === id),
    getBooksByAuthorId: (authorId) => state.books.filter(b => b.authorId === authorId),
    getBooksByPublisherId: (publisherId) => state.books.filter(b => b.publisherId === publisherId)
};

const actions = {
    addBook: (book) => {
        book.id = Math.max(...state.books.map(b => b.id)) + 1;
        state.books.push(book);
    },
    updateBook: (id, updateBook) => {
        const index = state.books.findIndex(b => b.id === id);
        if (index !== -1) {
            state.books[index] = { ...updateBook, id };
        }
    },
    addAuthor: (author) => {
        author.id = Math.max(...state.authors.map(a => a.id)) + 1;
        state.authors.push(author);
    },
    updateAuthor: (id, updateAuthor) => {
        const index = state.authors.findIndex(a => a.id === id);
        if (index !== -1) {
            state.authors[index] = { ...updateAuthor, id };
        }
    },
    addPublisher: (publisher) => {
        publisher.id = Math.max(...state.publishers.map(p => p.id)) + 1;
        state.publishers.push(publisher);
    },
    updatePublisher: (id, updatePublisher) => {
        const index = state.publishers.findIndex(p => p.id === id);
        if (index !== -1) {
            state.publishers[index] = { ...updatePublisher, id };
        }
    }
};

export function useStore() {
    return { state, getters, actions };
}
