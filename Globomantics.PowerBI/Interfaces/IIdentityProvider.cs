using Microsoft.PowerBI.Api.V2.Models;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IIdentityProvider
    {
        EffectiveIdentity GetUserIdentity();
        EffectiveIdentity GetUserIdentityWithDatasetId(string datasetId);
    }
}
