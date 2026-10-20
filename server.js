import Express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import Schema from './schema';
import { ruruHTML } from 'ruru/server';


// Config
const APP_PORT = 3000;

const app = Express();

app.all('/graphql', createHandler({ schema: Schema }));

// 2. Serve the interactive IDE (GraphiQL alternative) on a separate GET route
app.get('/playground', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(APP_PORT, () => {
    `Server running on port ${APP_PORT}`
})