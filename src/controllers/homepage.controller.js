import { axiosInstance } from '../services/axiosInstance';
import { validationError } from '../utils/errors';
import { extractHomepage } from '../extractor/extractHomepage';

import { Redis } from '@upstash/redis';

const homepageController = async () => {
  try {
    const result = await axiosInstance('/home');

    const isRedisEnv = Boolean(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    );
    
    if (isRedisEnv) {
      const redis = Redis.fromEnv();
      const homePageData = await redis.get('home');

      if (homePageData) {
        console.log('CACHE HIT');
        // Ensure the cached data has the correct structure
        const parsedData = typeof homePageData === 'string' ? JSON.parse(homePageData) : homePageData;
        return {
          success: true,
          data: parsedData
        };
      }
      console.log('CACHE MISS');

      if (!result.success) {
        throw new validationError(result.message);
      }
      
      const extractedData = extractHomepage(result.data);
      const response = {
        success: true,
        data: extractedData
      };
      
      await redis.set('home', JSON.stringify(extractedData), {
        ex: 60 * 60 * 24,
      });
      return response;
    } else {
      if (!result.success) {
        throw new validationError(result.message);
      }
      
      const extractedData = extractHomepage(result.data);
      return {
        success: true,
        data: extractedData
      };
    }
  } catch (error) {
    console.error('Homepage controller error:', error);
    throw new validationError('Failed to fetch homepage data');
  }
};

export default homepageController;
