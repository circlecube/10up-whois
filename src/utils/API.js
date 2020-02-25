import axios from 'axios';
import cheerio from 'cheerio';

export default async function scrapeTeam() {
	const html = await axios.get('https://cors-anywhere.herokuapp.com/https://10up.com/about/');
	const $ = await cheerio.load(html.data);
	let team = [];
  
	$('#team .team-member').each((i, elem) => {
		team.push({
		  image: $(elem).find('.avatar.photo').attr('data-src'),
		  name: $(elem).find('.meta h3').text().replace(/\u00a0/g, " "),
		  title: $(elem).find('.meta p').text(),
		  group: $(elem).attr('class').replace('team-member team-', ''),
		  bio: $(elem).find('.employee-bio > p').text(),
		  id: i,
		})
	});
  
	// console.log(team);
	return team;
  }