const generateController = (model, schema) => ({
    async getAll(req, res) {
      try {
        const data = await model.findAll();
        res.json(data);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
    async getOne(req, res, next) {
      try {
        const data = await model.findByPk(req.params.id);
        if (!data) {
          next();
          return;
        }
        res.json(data);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
    async create(req, res) {
      try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
          res.status(400).json(result.error);
          return;
        }
        const data = await model.create(result.data);
        res.status(201).json(data);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
    async update(req, res, next) {
      try {
        const result = schema.partial().safeParse(req.body);
        if (!result.success) {
          res.status(400).json(result.error);
          return;
        }
        const [nbUpdated, dataUpdated] = await model.update(result.data, {
          where: {
            id: req.params.id,
          },
          returning: true,
        });
        if (!nbUpdated) {
          next();
          return;
        }
        res.json(dataUpdated[0]);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
    async delete(req, res, next) {
      try {
        const nbDeleted = await model.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (!nbDeleted) {
          next();
          return;
        }
        res.status(204).end();
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
  });
  
  export default generateController;
  