import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data,"data to send to api")
      var config = {
        method: "post",
        url: "http://134.122.64.108:3004/api/v1/auth/login",
        data
      };
      
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data});
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
