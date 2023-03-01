import { Configuration, OpenAIApi } from "openai";
import  express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = "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";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post('/chat', (req, res) => {
  const data = req.body.question;

  openai.createCompletion({
      model: "text-davinci-003",
      prompt: data,
      max_tokens: 1000,
      temperature: 0,
    })
    .then((response) => {
        console.log(response.data.choices[0].text);
        // res.send(response.data.choices[0].text);
        const arr = response.data.choices[0].text.split('\n');
        // console.log(arr);
        // console.log(JSON.stringify(arr));
        res.send(JSON.stringify(arr));
        // res.end(response.data.choices[0].text);
        
    })
});

app.listen(5000, (req, res) => {
  console.log(`Server listening of port 5000`);
});
