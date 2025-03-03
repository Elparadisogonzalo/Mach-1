curl -X POST "https://api.cloudflare.com/client/v4/zones/<zone_id>/dns_records" \
     -H "Authorization: Bearer <JYWHK5P5E49B5EFQ2H47KSB5BCAYZ1EDBH>" \
     -H "Content-Type: application/json" \
     --data '{
       "type": "A",
       "name": "<elparadisogonzalo.com>",
       "content": "<45.86.211.2>",
       "ttl": 1,
       "proxied": true
