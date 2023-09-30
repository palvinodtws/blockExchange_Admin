import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const {token}=req.body
  const {data} =req.body
  console.log(token,"all data---->")
  if (req.method === "POST") {
    try {
      var config = {
        method: "post",
        url: "http://134.122.64.108:3004/api/v1/webmaster/adduser",
        data,
        headers: {
          Authorization: `Bearer ${token} `,
        },
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
