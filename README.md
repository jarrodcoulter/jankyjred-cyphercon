# jankyjred-cyphercon
Files from my CypherCon talk: https://cyphercon.com/presentation/im-the-captain-now-true-story-of-a-web-worker-watering-hole-attack/
Update the website JavaScript files to emulate the Confluence CVE-2023-22527 based on https://github.com/Vozec/CVE-2023-22527

I've also included an encoded Java Dropper that detects the OS and drops the appropriate file. This was used to target Jenkins installations where we didn't know the base OS, therefore we included both payloads.
