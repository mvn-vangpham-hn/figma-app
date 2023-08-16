import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import TreeNode from "./components/TreeNode";

const App = ({ token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [loadingImagePreview, setLoadingImagePreview] = useState(false);

  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "cb4903a951msh6fe1a93ccb3aaf0p1db4fajsn5a4cd4b4d1b1",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  const headersFigma = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const nodeIdsGetImage = "4:45";

  const keyFileFigma = "YQfQY2crLchp6jUAnuKSFc";

  const getFileData = useCallback(() => {
    fetch(`https://api.figma.com/v1/files/${keyFileFigma}`, {
      method: "GET",
      headers: headersFigma,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res12", res);
        setData(res.document);
      })
      .finally(() => setLoading(false));
  }, [headersFigma]);

  const getImageFigma = useCallback(() => {
    setLoadingImagePreview(true);
    fetch(
      `https://api.figma.com/v1/images/${keyFileFigma}?ids=${nodeIdsGetImage}`,
      {
        method: "GET",
        headers: headersFigma,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setImagePreview(res.images[nodeIdsGetImage]);
      })
      .finally(() => setLoadingImagePreview(false));
  }, [headersFigma]);

  useEffect(() => {
    getFileData();
  }, [getFileData]);

  const traslateText = async (text) => {
    const body = new URLSearchParams({
      q: text,
      target: "vi",
      source: "en",
    });
    return fetch(url, { ...options, body })
      .then(async (res) => {
        const result = await res.text();
        const result2 = JSON.parse(result);
        return result2.data.translations[0].translatedText;
      })
      .catch((error) => {
        console.log(error, "error12");
        return null;
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="wrap-header">
        <button onClick={getImageFigma}>Preview</button>
      </div>
      {!!imagePreview && !loadingImagePreview && (
        <img src={imagePreview} alt="preview" />
      )}
      {loadingImagePreview && <h1>Loading image preview</h1>}
      <ul>
        <TreeNode data={data} traslateText={traslateText} />
      </ul>
    </div>
  );
};

export default App;
