import axios from 'axios';
import encode from 'jwt-encode';

const API_DOMAIN = '/api/klingai';
const ACCESS_KEY = '16fd770a046d40d38e249bd35ddf6cf6'
const SECRET_KEY = 'dce2abd40f874ee3bd257f970218ae37'

interface TryOnResponse {
  code: number;
  message: string;
  request_id: string;
  data: {
    task_id: string;
    task_status: 'submitted' | 'processing' | 'succeed' | 'failed';
    created_at: number;
    updated_at: number;
  };
}

interface TryOnResult {
  code: number;
  message: string;
  request_id: string;
  data: {
    task_id: string;
    task_status: 'submitted' | 'processing' | 'succeed' | 'failed';
    task_status_msg: string;
    created_at: number;
    updated_at: number;
    task_result?: {
      images: {
        index: number;
        url: string;
      }[];
    };
  };
}

const generateToken = (): string => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: ACCESS_KEY,
    exp: now + 1800, // 30 minutes
    nbf: now - 5, // 5 seconds ago
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  return encode(payload, SECRET_KEY, header);
};

export const createTryOnTask = async (humanImageUrl: string, clothImageUrl: string): Promise<string> => {
  try {
    const token = generateToken();
    const response = await axios.post<TryOnResponse>(
      `${API_DOMAIN}/v1/images/kolors-virtual-try-on`,
      {
        model_name: 'kolors-virtual-try-on-v1-5',
        human_image: humanImageUrl,
        cloth_image: clothImageUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.code !== 0) {
      throw new Error(response.data.message);
    }

    return response.data.data.task_id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create try-on task');
    }
    throw error;
  }
};

export const getTryOnResult = async (taskId: string): Promise<TryOnResult['data']> => {
  try {
    const token = generateToken();
    const response = await axios.get<TryOnResult>(
      `${API_DOMAIN}/v1/images/kolors-virtual-try-on/${taskId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.code !== 0) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to get try-on result');
    }
    throw error;
  }
};

export const pollTryOnResult = async (taskId: string, maxAttempts = 30, interval = 2000): Promise<string> => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await getTryOnResult(taskId);

    if (result.task_status === 'succeed' && result.task_result?.images[0]) {
      return result.task_result.images[0].url;
    }

    if (result.task_status === 'failed') {
      throw new Error(result.task_status_msg || 'Try-on task failed');
    }

    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Timeout waiting for try-on result');
}; 