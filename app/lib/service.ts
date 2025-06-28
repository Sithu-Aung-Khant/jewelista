import { Testimonial, RandomUser } from './types';

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const [usersRes, commentsRes] = await Promise.all([
      fetch('https://randomuser.me/api/?results=8'),
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=8'),
    ]);

    if (!usersRes.ok || !commentsRes.ok) {
      throw new Error('Failed to fetch mock data');
    }

    const usersData = await usersRes.json();
    const commentsData = await commentsRes.json();

    return usersData.results.map((user: RandomUser, index: number) => ({
      id: index + 1,
      image: user.picture.large,
      name: `${user.name.first} ${user.name.last}`,
      position: `${user.location.city}, ${user.location.country}`,
      description: commentsData[index]?.body || 'Great service!',
    }));
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    throw err;
  }
};
