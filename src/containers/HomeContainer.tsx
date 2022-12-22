import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsRequest } from "../actions/postActions";
import { RootState } from "../reducers";

const HomeContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const { pending, posts, error } = useSelector(
        (state: RootState) => state.posts
    );

    useEffect(() => {
        dispatch(fetchPostsRequest());
    }, []);

    return (
        <div>
            {pending ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error</div>
            ) : (
                posts?.map((todo, index) => (
                    <div key={todo.id}>
                        {++index}. {todo.title}
                    </div>
                ))
            )}
        </div>
    );
};

export default HomeContainer;
