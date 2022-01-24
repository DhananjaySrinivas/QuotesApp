import { useHistory } from "react-router-dom";
import useHttp from "../components/hooks/use-http";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../components/lib/api";
import { useEffect } from "react";

const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return <QuoteForm  isLoading={status==='pending'} onAddQuote={addQuoteHandler} />;
};
export default NewQuotes;
