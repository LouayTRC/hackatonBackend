const Application = require('../Models/Application');

exports.addApp = (req, res, next) => {
    let data = req.body;
    data.worker = req.auth.user_id
    let application = new Application(data);
    application.save()
        .then(
            (saved) => {
                res.status(200).send(saved);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err)
            }
        )

}

exports.getApps = (req, res, next) => {
    if (req.params?.id) {
        Application.findOne({ _id: req.params.id })
            .then(
                (application) => {
                    res.status(200).send(application);
                }
            )
            .catch(
                (err) => {
                    res.status(400).send(err);
                }
            )
    }
    else {
        Application.find()
            .then(
                (applications) => {
                    res.status(200).send(applications);
                }
            )
            .catch(
                (err) => {
                    res.status(400).send(err);
                }
            )
    }

}
exports.updateApp = (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Application.findOne({ _id: id })
        .then((app) => {
            if (req.auth.user_id == app.worker) {
                console.log("here1");
                Application.updateOne({ _id: id }, data)
                    .then(() => {
                        Application.findOne({ _id: id })
                            .then((app) => res.status(200).send(app))
                            .catch(error => res.status(400).send(error))
                    }
                    )
                    .catch(
                        (err) => {
                            res.status(400).send(err);
                        }
                    )
            }
            else {
                console.log("here2");
                res.status(401).send('unauthorized')
            }
        })
        .catch(error => res.status(400).send('aaa'))


}
exports.deleteApp = (req, res) => {
    let id = req.params.id
    Application.findOne({ _id: id })
        .then((app) => {
            if (req.auth.user_id == app.worker) {
                console.log("here1");
                Application.deleteOne({ _id: id })
                    .then(
                        () => {
                            res.status(200).send({ message: 'deleted' });
                        }
                    )
                    .catch(
                        (err) => {
                            res.status(400).send(err);
                        }
                    )
            }
            else {
                console.log("here2");
                res.status(401).send('unauthorized')
            }
        })
        .catch(error => res.status(400).send('aaa'))
}
