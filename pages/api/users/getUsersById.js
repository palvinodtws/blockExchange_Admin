import axios from "axios";
import { getSession } from "next-auth/react";
import { Router } from "next/router";

export default async function handler(req, res) {
  const {token}=req?.body
  const {data}=req?.body

  if (req.method === "POST") {
  const id = req.body
 console.log(id,"get users by id here")
    try {
      var config = {
        method: "post",
        url: "http://134.122.64.108:3004/api/v1/webmaster/getuserbyid",
        headers: {
          Authorization: `Bearer ${token} `,
        },data
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
