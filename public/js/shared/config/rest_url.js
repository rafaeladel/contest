var urls = {
    contest: {
        list: "/api/contests",
        index: "/api/contests/:id",
        add: "/api/contests",
        edit: "/api/contests/:id",
        delete: "/api/contests/:id"
    },
    match: {
        list: "/api/matches",
        index: "/api/matches/:id",
        add: "/api/contests/:contest_id/matches/add",
        edit: "/api/matches/:id",
        delete: "/api/matches/:id"
    },
    question: {
        list: "/api/questions",
        index: "/api/questions/:id",
        add: "/api/questions",
        addToContest: "/api/contests/:contest_id/questions/add",
        edit: "/api/questions/:id",
        delete: "/api/questions/:id"
    },
    user: {
        list: "/api/users",
        index: "/api/users/:id",
        add: "/api/users",
        edit: "/api/users/:id",
        delete: "/api/users/:id"
    }
};
angular.module("sharedMain").constant("restUrls", urls);