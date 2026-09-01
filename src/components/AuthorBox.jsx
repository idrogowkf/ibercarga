import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthorBox({ author, compact = false }) {
  return <aside className="authorBox panel" aria-label={author.language === 'en' ? 'About the author' : 'Sobre el autor'}><div className="authorAvatar" aria-hidden="true">LI</div><div><span className="caseType">{author.role}</span><h2>{author.heading}</h2><p>{author.bio}</p>{!compact && <Link className="serviceLink" to={author.path}>{author.language === 'en' ? 'Author profile →' : 'Perfil del autor →'}</Link>}</div></aside>;
}
