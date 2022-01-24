import { Fragment, useEffect } from "react";
import { Link, Route, useParams,useRouteMatch } from "react-router-dom";
import HighlitedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import useHttp from "../components/hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import { getSingleQuote } from "../components/lib/api";
const QuoteDetail = () => {
  const params = useParams();
  const match =useRouteMatch();
  const {quoteId} = params;
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  }=useHttp(getSingleQuote,true);
  useEffect(()=>
  {
    sendRequest(quoteId)
  },[sendRequest, quoteId]);
  if(status==='pending')
  {
      return(
          <div className="centered">
              <LoadingSpinner/>
          </div>
      )
  }
  if(error){
      return <p className="centered focused">{error}</p>
  }
  if (!loadedQuotes.text){
      return<p>No Quote Found</p>;

  }
  
  return (
    <Fragment>
      <HighlitedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            {" "}
            Comments{" "}
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
