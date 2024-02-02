import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req);
      console.log( currentUser );
      const { movieId } = req.body;
      console.log('Request Body: ', req.body);

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      console.log(existingMovie);

      if(!existingMovie){
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            set: [...currentUser.favoriteIds, movieId],
          }
        }
      });

      res.status(200).json(user);
    }

    if(req.method === 'DELETE'){
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if(!existingMovie){
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      console.log(updatedFavoriteIds);
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });      

      res.status(200).json(updatedUser);
    }

    res.status(405).end();
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}