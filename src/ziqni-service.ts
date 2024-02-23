// @ts-ignore
import { AchievementRequest, ApiClientStomp, AchievementsApiWs } from '@ziqni-tech/member-api-client';

export class ZiqniService {
    public async initialize(){
          const apiClientStomp = ApiClientStomp.instance;

          // TODO: get the JWT
          await apiClientStomp.connect({ token: "todo" });

          const achievementsApiWsClient = new AchievementsApiWs(apiClientStomp);

          const achievementRequest = AchievementRequest.constructFromObject({
            achievementFilter: {
              productIds: [],
              tags: [],
              startDate: null,
              endDate: null,
              ids: [],
              statusCode: {
                moreThan: 0,
                lessThan: 40
              },
              sortBy: [{
                queryField: 'created',
                order: 'Desc'
              }],
              skip: 0,
              limit: 10,
              constraints: []
            }
          }, null);

          achievementsApiWsClient.getAchievements(achievementRequest, (json: any) => {
            console.log('API called successfully. Returned data: ' + json.data);
          });
    }

    getUserToken() {
        return new URLSearchParams(window.location.search).get('token') ?? undefined;
    }
}