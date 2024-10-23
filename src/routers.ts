import { Router, Request, Response, NextFunction } from 'express';
import { Logic } from './logic';

const router = Router();

const logic = new Logic();

export = (data?: any) => {
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await logic.createTag(req.body.key);

      res.status(200).json({ message: 'successors', data: result });
    } catch (error) {}
  });

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await logic.getAllTags();

      res.status(200).json({ message: 'successors', data: result });
    } catch (error) {}
  });
  router.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await logic.getTagById(req.params.id);

      res.status(200).json({ message: 'successors', data: result });
    } catch (error) {}
  });
  router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await logic.updateTag(req.body.id, req.body.key);

      res.status(200).json({ message: 'successors', data: result });
    } catch (error) {}
  });

  router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await logic.deleteTag(req.body.id);
      res.status(200).json({ errors: [], data: result });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
