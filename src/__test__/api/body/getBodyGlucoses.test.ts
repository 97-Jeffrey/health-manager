// At the VERY TOP of your test file, before any imports
jest.mock('../../../lib/Auth/config', () => {
    // This needs to return the full module implementation
    return {
      UserPoolId: 'mock-user-pool-id',
      ClientId: 'mock-client-id',
      initAuth: jest.fn(),
      getUserPool: jest.fn(),
      getUser: jest.fn(() => ({
        getSession: jest.fn(),
        signOut: jest.fn()
      })),
      setCurrUserSession: jest.fn(),
      getCurrUserSession: jest.fn()
    };
  });
  
  // Now import your other dependencies
  import axios from 'axios';
  import getBodyGlucoses from '../../../lib/api/body/getBodyGlucoses';
  import { getAuthSession } from '../../../lib/Auth';
  import { AuthSessionInterface } from '../../../types/authInterface';
  import { BodyGlucoseInterface } from '../../../types/bodyGlucose';
  
  // Mock other modules
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  
  // Type assertion for getAuthSession
  const mockedGetAuthSession = getAuthSession as jest.MockedFunction<typeof getAuthSession>;
  
  describe('getBodyGlucoses', () => {
    const mockSession: AuthSessionInterface = {
      id: 'user-123',
      accessToken: 'token-123',
      email: 'user@example.com'
    };
  
    const mockGlucoseData: BodyGlucoseInterface[] = [
      {
        id: 'glucose-1',
        date: '2023-01-01',
        glucose: 95
      },
      {
        id: 'glucose-2',
        date: '2023-01-02',
        glucose: 100
      }
    ];
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return body glucose data when API call is successful', async () => {
      mockedGetAuthSession.mockResolvedValue(mockSession);
      mockedAxios.get.mockResolvedValue({
        data: mockGlucoseData
      });
  
      const result = await getBodyGlucoses();
      
      expect(mockedGetAuthSession).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/body/user-123/glucoses'),
        {
          headers: { Authorization: 'Bearer token-123' }
        }
      );
      expect(result).toEqual(mockGlucoseData);
    });
  });