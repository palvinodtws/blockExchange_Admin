

import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const id = req.body;
      console.log(id,"to get the data send to api")
      var config = {
        method: "post",
        url: "http://3.223.152.95:3000/api/v1/admin/deletehappycouple",
        headers: {
          Authorization: `Bearer ${session?.user.name} `,
        },data:id
      };
      await axios(config).then(function (response) {
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
