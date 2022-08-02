import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get("/posts");
    
    dispatch({
        type: "FETCH_POSTS",
        payload: response.data
    });

};

export const fetchUser = userId => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${userId}`);

    dispatch({
        type: "FETCH_USER",
        payload: response.data
    });
};

// Refactor using memoization to prevent overfetching

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${userId}`)

//     dispatch({
//         type: "FETCH_USER",
//         payload: response.data
//     })
// });

// export const fetchUser = userId => dispatch => _fetchUser(userId, dispatch)

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // Function returned by fetchPosts will be dispatched, then invoked by Redux Thunk
    await dispatch(fetchPosts());
    
    // Maps over posts array returned from state and returns only unique userId values
    const userIds = _.uniq(_.map(getState().posts, "userId"));

    // Calls fetchUser action creator for each userId
    userIds.forEach(userId => dispatch(fetchUser(userId)));
}